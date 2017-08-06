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

var SCENE_MANAGER = {
  scenes: {}, //all the WebGL Scenes
  currentScene: 0,
  /**
   * init : loads all the scenes
   */
  init: function()
  {
    //Creating all the WebGL scenes
    for(var _i=0; _i<NUMBER_OF_SCENES; _i++) {
      __debug("Loading scene " + _i);
      SCENE_MANAGER.scenes[_i] = new THREE.Scene();
      SCENE_DATA.load(_i, SCENE_MANAGER.scenes[_i]);
    }
    SCENE_MANAGER.addGroups();
  },

  setScene: function(SCENE_ID)
  {
    currentScene = SCENE_ID;
  },

  parallaxScrolling: function(percent)
  {
    var currentScene = SCENE_MANAGER.scenes[SCENE_MANAGER.currentScene];
    for(var g in currentScene.groups)
    {
      //Calculate the translation according to the translation
      currentScene.groups[g].group.position.setX(
        SCENE_MANAGER.layerMove(
          percent,
          currentScene.groups[g].width,
          APP.width
        )
      );
    }
  },

  layerMove: function(percent, groupWidth, viewWidth)
  {
    return -percent*(groupWidth-viewWidth)/100;
  },

  /**
   * loading all the groups at once
   */
  createGroups: function(scene, depths, sceneWidth, sceneHeight)
  {
    scene.groups = [];
    for(var depth in depths)
    {
      scene.groups.push({
        group: new THREE.Group(),
        depth: depths[depth],
        width: convertToWidth( depths[depth], sceneWidth),
        height: sceneHeight
      });
    }
  },

  /**
   * adding groups of each scene to webgl
   */
  addGroups: function()
  {
    for(var s in SCENE_MANAGER.scenes)
    {
      for(var groups in SCENE_MANAGER.scenes[s].groups)
      {
        SCENE_MANAGER.scenes[s].add(SCENE_MANAGER.scenes[s].groups[groups].group);
      }
    }

  }

};
