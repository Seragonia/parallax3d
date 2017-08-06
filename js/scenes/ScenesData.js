/**
* Game Name:
* Author:       William Lardier
* License:      MIT
*
* MIT License
*
* Copyright (c) [2017] [LARDIER William]
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
**/
"use strict";

/*********************************************
* Calcul de la largeur du layer suivant sa profondeur,
* la largeur max et min du parallaxe
* profondeur : [-100,0]
*********************************************/
var MIN_PARALLAX_WIDTH = function(scene_width){
  return APP.width
}
var MAX_PARALLAX_WIDTH= function(scene_width){
  return scene_width;
}

function convertToWidth(z, scene_width)
{
  var min_width = MIN_PARALLAX_WIDTH(scene_width);
  var max_width = MAX_PARALLAX_WIDTH(scene_width);
  var delta = max_width - min_width;
  z = 100-Math.abs(z);
  return min_width + z*delta/100 -1;
}

function addElement(group, x, y, texture)
{
  //texture transparency and antialiasing
  texture.minFilter = texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;
  //Adding the plane to the scene
  var geometry = new THREE.PlaneGeometry( texture.image.width, texture.image.height );
  var material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: texture, transparent: true} );
  var plane = new THREE.Mesh( geometry, material );
  plane.translateX(texture.image.width/2 + x);
  plane.translateY(texture.image.height/2 + y);
  plane.translateZ(group.depth);
  group.group.add( plane );
}

var SCENE_DATA =
{
  load: function(SCENE_ID, scene)
  {
    //Axis
    if(DEBUG) scene.add( new THREE.AxisHelper( 5 ) );
    switch(SCENE_ID)
    {
      case 0:
        const WIDTH = 2357;
        const HEIGHT = APP.height; 
        scene.scene_Depths = [
          -100,
          -80,
          -65,
          -60,
          -20,
          0
        ];
        SCENE_MANAGER.createGroups(scene, scene.scene_Depths, WIDTH, HEIGHT);

        // Ajout des éléments dans la scène
        addElement(
          scene.groups[0], //group
          0, //x
          0, //y
          TEXTURE_ARRAY[0].texture
        );

        addElement(
          scene.groups[1], //group
          0, //x
          0, //y
          TEXTURE_ARRAY[1].texture
        );

        addElement(
            scene.groups[2], //group
            0, //x
            0, //y
            TEXTURE_ARRAY[2].texture
          );

        addElement(
          scene.groups[3], //group
          0, //x
          0, //y
          TEXTURE_ARRAY[3].texture
        );

        addElement(
          scene.groups[4], //group
          0, //x
          0, //y
          TEXTURE_ARRAY[4].texture
        );

        addElement(
          scene.groups[5], //group
          0, //x
          0, //y
          TEXTURE_ARRAY[5].texture
        );

        break;
    }
  }
}
