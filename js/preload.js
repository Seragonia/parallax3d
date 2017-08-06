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
const objects2load = [
  {url: "js/ressources/scene_1/0_1.png", name: "0_1"},
  {url: "js/ressources/scene_1/1_1.png", name: "1_1"},
  {url: "js/ressources/scene_1/2_1.png", name: "2_1"},
  {url: "js/ressources/scene_1/3_1.png", name: "3_1"},
  {url: "js/ressources/scene_1/4_1.png", name: "4_1"}
];
var TEXTURE_ARRAY = [];
const totalSize = 0;
const NUMBER_OF_SCENES = 8;

var DATA = new THREE.LoadingManager();
DATA.onProgress = function ( item, loaded, total ) {
  var percent = loaded / total * 100;
  //Loading finished : starting the game
  if(percent == 100)
    APP.init();
};

for(var _i = 0; _i<objects2load.length; _i++)
{
  //Dynamic loader
  var extension = objects2load[_i].url.split('.').pop();
  var types = ['png', 'jpg', 'json', 'mp3'];
  switch(extension)
  {
    case "png":
    case "jpg":
    TEXTURE_ARRAY.push(
      {
        texture: new THREE.TextureLoader(DATA).load(objects2load[_i].url),
        name: objects2load[_i].name
      }
    );
    break;
    case "json":

    break;
    case "mp3":

    break;
  }

}
