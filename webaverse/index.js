
import * as THREE from 'three';
import metaversefile from 'metaversefile';
const { useApp, useLoaders, useFrame, useScene, useInternals, useLocalPlayer, useActivate, useUse, useWear, usePhysics, getAppByPhysicsId, useCleanup } = metaversefile;

//

const baseUrl = import.meta.url.replace(/(\/)[^\/\/]*$/, '$1');

const NFTWallets = [
    {
        chainName:  'eth',
        owner:      '0x08e242bb06d85073e69222af8273af419d19e4f6'
    }
];

export default e => {

    const app = useApp();
    const { components } = app;
    const { scene, camera } = useInternals();
    const localPlayer = useLocalPlayer();
    const physics = usePhysics();

    const floorPhysicsId = physics.addBoxGeometry(
        new THREE.Vector3(0, -1000, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1000, 2000, 1000).multiplyScalar(0.5),
        false
    );

    const placeHolders = [];
    const doors = { speed: 0.05, left: null, right: null, state: 'closed', offset: 0, offsetMax: 5 };
    const raycaster = new THREE.Raycaster();
    const tmpVec3a = new THREE.Vector3();

    const loadModel = ( params ) => {

        return new Promise( ( resolve, reject ) => {

            const { gltfLoader } = useLoaders();
            gltfLoader.load( params.filePath + params.fileName, ( gltf ) => {

                resolve( gltf.scene );

            });

        });

    };

    // tmp UI

    const nftInfoDiv = document.createElement('div');
    nftInfoDiv.innerHTML = '<div id="nft-name" style="color: #fff;"></div>';
    nftInfoDiv.style['display'] = 'none';
    nftInfoDiv.style['position'] = 'absolute';
    nftInfoDiv.style['bottom'] = '150px';
    nftInfoDiv.style['right'] = '0px';
    nftInfoDiv.style['padding'] = '20px';
    nftInfoDiv.style['background-color'] = '#000000';
    document.body.appendChild( nftInfoDiv );
    const nftTitle = document.querySelector('#nft-name');

    //

    function loadNftWallets () {

        let placeholderId = 0;

        NFTWallets.forEach( ( NFTWallet ) => {

            fetch( `https://nft.webaverse.com/nft/?chainName=${ NFTWallet.chainName }&owner=${ NFTWallet.owner }` )
                .then( response => response.json() )
                .then( ( data ) => {

                    data.forEach( ( nft ) => {

                        const image = nft.metadata?.image;
                        if ( image && image.indexOf( 'ipfs' ) === -1 ) {

                            const placeholder = placeHolders[ placeholderId ++ ];

                            if ( placeholder ) {

                                const map = new THREE.TextureLoader().load( ( image.indexOf('data:image') === 0 ? image : `/@proxy/${ image }` ) );
                                placeholder.material = new THREE.MeshBasicMaterial({ color: 0xffffff, map })
                                for ( let i = 0; i < placeholder.geometry.attributes.uv.count; i ++ ) {
                                    placeholder.geometry.attributes.uv.setY( i, 1 - placeholder.geometry.attributes.uv.getY( i ) );
                                }
                                placeholder.geometry.attributes.uv.needsUpdate = true;
                                placeholder.userData.metadata = nft.metadata;

                            }

                        }

                    });

                });

        });

    };

    function pick () {

        raycaster.setFromCamera( { x: 0, y: 0 }, camera );
        const intersection = raycaster.intersectObjects( scene.children, true )[0];

        if ( intersection ) {

            const objName = intersection.object.name ?? '';

            if ( objName.indexOf('Placeholder') !== -1 ) {

                nftInfoDiv.style['display'] = 'block';
                nftTitle.innerHTML = intersection.object.userData.metadata.name;

            } else {

                nftInfoDiv.style['display'] = 'none';

            }

        }

    };

    function updateDoors () {

        if ( ! doors.left || ! doors.right ) return;
        let distance = tmpVec3a.set( ( doors.left.position.x + doors.right.position.x ) / 2, 0, ( doors.left.position.z + doors.right.position.z ) / 2 ).sub( localPlayer.position );
        distance.y = 0;
        distance = distance.length();

        if ( distance < 2 && doors.state !== 'opened' ) {

            doors.state = 'opening';

        }

        if ( distance > 2 && doors.state !== 'closed' ) {

            doors.state = 'closing';

        }

        if ( doors.state === 'opening' ) {

            doors.offset += doors.speed;
            doors.left.position.x = doors.left.userData.origPos.x + doors.offset;
            doors.right.position.x = doors.right.userData.origPos.x - doors.offset;

            if ( doors.offset >= doors.offsetMax ) {

                doors.state = 'opened';

            }

        }

        if ( doors.state === 'closing' ) {

            doors.offset -= doors.speed;
            doors.left.position.x = doors.left.userData.origPos.x + doors.offset;
            doors.right.position.x = doors.right.userData.origPos.x - doors.offset;

            if ( doors.offset <= 0 ) {

                doors.state = 'closed';

            }

        }

        doors.left.updateWorldMatrix();
        doors.right.updateWorldMatrix();

    };

    //

    useFrame(() => {

        pick();
        updateDoors();

    });

    useCleanup(() => {

        physics.removeGeometry(floorPhysicsId);

    });

    loadModel({ filePath: baseUrl, fileName: 'assets/space_pod2.glb', pos: { x: 0, y: 0, z: 0 } } ).then( ( podMesh ) => {

        podMesh.traverse( ( item ) => {

            if ( item.name.indexOf( 'Placeholder' ) !== -1 ) {

                placeHolders.push( item );

            }

            if ( item.name === 'DoorLeft' ) {

                doors.left = item;
                doors.left.userData.origPos = doors.left.position.clone();

            }

            if ( item.name === 'DoorRight' ) {

                doors.right = item;
                doors.right.userData.origPos = doors.right.position.clone();

            }

        });

        physics.addGeometry( podMesh );
        app.add( podMesh );
        loadNftWallets();

    });

    return app;

};
