![Tests](https://github.com/hussamsh/Nova/workflows/Tests/badge.svg)
    
<!-- PROJECT LOGO -->
<br />

<p align="center">

  <a href="https://github.com/hussamsh/Nova">
    <img src="./app/assets/images/nova.png" alt="Logo" width="160" >
  </a>

<b><h1 align="center">NOVA</h1></b>

  <p align="center">
    A cryptography application for images based on chaotic maps
    <br />
    <br />
    <a href="https://github.com/github_username/repo/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo/issues">Request Feature</a>

  </p>

</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Download](#download)
  - [Usage](#usage)
  - [Gotchas](#gotchas)
- [Security](#security)
- [Examples](#examples)
  - [Lena](#lena)
- [Roadmap](#roadmap)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [C++ implementation](#c-implementation)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->
## About The Project

Nova's idea is to become a software equivilant for a part of my research on hardware implementations of chaotic ciphers, it utilizes `chaotic maps` and pixel by pixel encrpytion algorithms to cipher images.

I have already published part of my research if you would like to read more

**CLA based Floating-point adder suitable for chaotic generators on FPGA** on [IEEEXplore](https://ieeexplore.ieee.org/document/8704074)<br>
**Double humped based image encryption system on FPGA** (_under review_)

[![Product Name Screen Shot][product-screenshot]]()

*Nova offers three chaotic maps that can be used for encryption / decryption*
* **Logistic map** 
  Based on Robert May's [work](https://www.researchgate.net/publication/237005499_Simple_Mathematical_Models_With_Very_Complicated_Dynamics) back in 1976, the logistic map is the most iconic and heavily researched chaotic maps in his history.
* **Double humped map**
  Popularized by [Coiteux](https://core.ac.uk/download/pdf/61733598.pdf) in 2014, the double humped map shows a double hump in it's first iteration - hence the name - and exhibits some unique behavior that mkes it highly suitable for cryptogragic operations.
* **Tent map**
    Based on Robert May's [work](https://www.researchgate.net/publication/237005499_Simple_Mathematical_Models_With_Very_Complicated_Dynamics) back in 1976, the logistic map is the most iconic and heavily researched chaotic maps in his history.
<!-- **To avoid retyping too much info. Do a search and replace with your text editor for the following:** !-->
<!-- `github_username`, `repo`, `twitter_handle`, `email`  -->



### Built With

* [Electron](https://www.electronjs.org/)
* [React](https://reactjs.org/)


<!-- GETTING STARTED -->
## Getting Started

### Download
Download the lateset stable distribution for your OS.

<img src="./app/assets/images/microsoft.png" alt="Logo" width="160" >
<img src="./app/assets/images/macos.png" alt="Logo" width="160" >
<img src="./app/assets/images/linux.png" alt="Logo" width="160" >

### Usage

**Step 1 )**  Choose the desired image for encryption / decryption by drag-drop or clicking browse in the designated area. 


**Step 2 )**  Enter the desired params for your choosen map as well as an output directory for the processed image.

<img src="./app/assets/images/choose-param.png" alt="Logo" height="400px" >

<!-- [![Product Name Screen Shot][params-screenshot]]() -->


**Step 3 )**  Press Encrypt / Decrypt and wait for your image to be processed. Once finished you will find the processed image in the output directory with a suffix of either _encrypted / _decrypted.


### Gotchas

* When choosing an image it's a good idea to compress / resize the image as much as possible. Especially resizing the image will yield a much better performance as the number of pixel is inversly propotional with the time needed for encryption.
  
* Make sure that the values chosen as input makes since for the chosen map, not any two values will suffice. Each chaotic map has it's own ranges that it can operate in. Refer to [this page]() to learn more.

* Be mindful of what parameters you use for encrypting an image and write them down or memorize them as any slight change will not yield a correct decryption of an image you need to enter the <b>exact</b> numbers you used for encryption, i.e $3.725 \neq 3.724$.

## Security

One aspect of measuring the security of any encrypton is called `key space analysis` which is simply the number of keys - permutations - that an attacker has to through in order to find the parameters your are using.

A map like the double humped map has three input parameters at 64 bits length yields it's size to be 192 bits long which constitues a key space of $2^{192} = 10^{57}$ keys in total.

Lets put this into prespective. Our entire solar systems has about $10^{56}$ atoms which means that an attacker that can harness the power of our solar system and make every single atom calculate one key of the map, will be an order of magnitude short of achieving his goal. 

Of course there are other aspects of measuring security for an encryption system such as entropy, key sensitivity analysis, differential attacks ... etc. For a thourgh analysis of our Double humped map example, read this [journal](https://www.sciencedirect.com/science/article/pii/S2090123218300195)


## Examples

### Lena

|Original                                       | Encrpypted                                                         |
|:---------------------------------------------:|:------------------------------------------------------------------:| 
|<img src="./app/assets/images/lena.png" width="300px" >| <img src="./app/assets/images/lena_enc.png" width="300px">     |
|<img src="./app/assets/images/ruby.jpg" width="300px" >| <img src="./app/assets/images/ruby_enc.jpg" width="300px"> |



## Roadmap

* Adding more maps to choose from.
* Histograms and comaprisons right inside the app


## Development

If you would like to develop a new feature or see how the code is running under the hood follow these steps.

### Prerequisites
* **Node**
  
  Install node from the [offical mirror](https://nodejs.org/en/download/) - this comes with `npm` too.

### Installation

* **Fork the project / Download**

* **Install NPM packages** 
  ```sh
   cd Nova
   npm install 
  ```
* **Build project**
  ```sh
  npm run build
  ```
  or to watch your files 
  ```sh
  npm run watch
  ```
* **Test**

  Test to see that everything is working
  ```sh
  npm run test
  ```
* **Run**
  ```sh
  npm run start
  ```

## C++ implementation

I have implemented this project in c++ which run from CLI and perofrmes at 3 - 5 times the speed of this implementation in javascript. Check it out in this [github repo](). 


## License

TODO

## Contact

TODO



[product-screenshot]: ./app/assets/images/screenshot.png
[params-screenshot]: ./app/assets/images/choose-param.png
