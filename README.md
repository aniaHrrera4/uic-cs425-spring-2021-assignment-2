# CS425 - Computer Graphics I (Spring 2021) -Andrea Herrera (aherre57)

## Assignment 2: Shadow maps
The goal of this assignment is to implement the shadow mapping technique using WebGL. Also considering what we have learned in assignment 1, you will develop an application to render shadows (directional light) on an urban setting described in an external JSON file that must be uploaded by the user through a configuration panel. The JSON file has four layers describing the elements and color of buildings, parks, water and surface of a particular region (see below for a complete description of the file). Just like assignment 1, you should use a unique buffer and VAO for *each* layer.
# CODE implemented

gl.js 

Four main classes/functions That were updated:
-implement the `init` and `draw` functions in the `Layer` class
-create both a `LayerProgram` as well as a `ShadowMapProgram` (use one or the other depending if it is the first or second pass of the shadow map technique.)
-implemented the transformation matrices inside `updateViewMatrix`, `updateModelMatrix`, and `updateProjectionMatrix`,
-implemented the light transformation matrices inside `updateLightViewMatrix` and `updateLightProjectionMatrix`,

For the following functions code from LAB 5 was used for the Fragment and vertex shaders 
//and code from shadows slides

*.vert.js: vertex shaders files
   gl_Position = vec4(position, 1);
   vTexcoord = position.xy * 0.5 + 0.5;


*.frag.js: fragment shaders files
    vec4 color = texture(uSampler, vTexcoord);
    float depth = color.r;
    outColor = vec4(vec3(depth),1);// + vec4(0,-1,0,1);

To add the buildingLayer:
layers.addBuildingLayer(layer, parsed[layer].coordinates, parsed[layer].indices,parsed[layer].normals,parsed[layer].color);

    The JSON will be in the following format:
    {
    'buildings': 
    {
        'coordinates': [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n],
        'indices': [i_1,i_2,...,i_n],
        'normals': [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n],
        'color': [r,g,b,a]
    },
    'water': 
    {
        'coordinates': [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n],
        'indices': [i_1,i_2,...,i_n],
        'color': [r,g,b,a]
    },
    'parks': 
    {
        'coordinates': [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n],
        'indices': [i_1,i_2,...,i_n],
        'color': [r,g,b,a]
    },
    'surface':
    {
        'coordinates': [x_1,y_1,z_1,x_2,y_2,z_2,...,x_n,y_n,z_n],
        'indices': [i_1,i_2,...,i_n],
        'color': [r,g,b,a]
    },
}



For the following functions code from LAB 3 was used.

- `updateModelMatrix` :when the user changes the value of slider (2), the camera rotates around the centerpoint of the layers.
- `updateProjectionMatrix`: two types of projections (orthographic and perspective were implemented using the dropdown functionality from the drop down menu
- `updateViewMatrix`: when the user changes the value of slider (2), the camera rotates around the centerpoint of the layers.

*.vert.js: vertex shaders files
    //set color as the dot product between a light direction, and the vertex normal
    vColor = uColor;
    //& transform position
    gl_Position = uProjection * uView * uModel * vec4(position, 1);


*.frag.js: fragment shaders files
    //set color 
    outColor = vColor;

///////////ERROR IN SHADOW FRAGMENT AND VERTEX SHADER ////////
# GitHub Classroom
git is a version control system, designed to help developers track different versions of your code, synchronize them across different machines, and collaborate with others. Follow the instructions here to install git on your computer. GitHub is a website that supports git as a service. This a nice tutorial on how to get started with git and GitHub.

Use git clone to get a local copy of the newly created repository. After writing your code, you can push your modifications to the server using git commit followed by git push. For example, if your username is uic-user:

git clone git@github.com:uic-cs425/assignment-1-uic-user.git
touch index.html
git add index.html
git commit -am "index.html file"
git push
