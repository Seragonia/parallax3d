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
* of Game software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and Game permission notice shall be included in all
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
const DEBUG = true;
//Debugging function
var __debug = function(msg) { if(DEBUG){console.log("[DEBUG] : " + msg);} }

var APP = {
  width: document.getElementById("game").width,
  height: document.getElementById("game").height,
  renderer: null,
  camera: null,
  mouse: {x:0, y:0},
  cameraSmooth: {x:0,y:0,z:-0.1,move:false,speed:10.0},
  cpt: 0,
  /**
  * Loading WebGL before rendering the scene
  */
  init: function()
  {
    SCENE_MANAGER.init();
    APP.initCamera();
    APP.initRenderer();

    if(DEBUG)
    {
      APP.stats = new Stats();
      document.getElementById("stats").appendChild(APP.stats.dom);
    }


    __debug("APP object created.");
    __debug("Game has started !");
    APP.render();
  },
  /**
   * Camera initialization
   */
  initCamera: function()
  {
    APP.camera = new THREE.OrthographicCamera(0, APP.width, APP.height, 0, 0, 100 );
    APP.camera.up = new THREE.Vector3(0,1,0);
  },

  /**
   * Renderer initialization
   */
  initRenderer: function()
  {
    APP.renderer = new THREE.WebGLRenderer(
      {
        antialias: true, // to get smoother output
        canvas: document.getElementById("game")
      }
    );
    APP.renderer.setSize( APP.width, APP.height );

  },

  /**
   * Rendering the current scene
   */
  render: function()
  {
    requestAnimationFrame( APP.render );
    APP.cpt += 0.1 % 100;
    APP.cameraMove(Math.abs(Math.sin(APP.cpt/100 * Math.PI*2)*100));
    APP.renderer.render( SCENE_MANAGER.scenes[SCENE_MANAGER.currentScene], APP.camera );
    if(DEBUG) APP.stats.update();
  },

  cameraMove: function(percent)
  {
    SCENE_MANAGER.parallaxScrolling(percent);
  }
};
