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
  - [Installation](#installation)
  - [Usage](#usage)



<!-- Place this tag where you want the button to render. -->
<GitHubButton href="https://github.com/ntkme/github-buttons/archive/master.zip" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-download" data-size="large" aria-label="Download ntkme/github-buttons on GitHub">Download</GitHubButton>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]()

NOVA is a cryptographic application that enables encryption and decryption of images using latest technologies - mainly **Chaotic maps.**

*Nova offers three chaotic maps that can be used for encryption / decryption*
* **Logistic map** 
  Based on Robert May's [work](https://www.researchgate.net/publication/237005499_Simple_Mathematical_Models_With_Very_Complicated_Dynamics) back in 1976, the logistic map is the most iconic and heavily researched chaotic maps in his history.
* **Double humped map**
  Popularized by [Coiteux](https://core.ac.uk/download/pdf/61733598.pdf) in 2014, the double humped map shows a double hump in it's first iteration - hence the name - and exhibits some unique behavior that mkes it highly suitable for cryptogragic operations.
* **Tent map**
    Based on Robert May's [work](https://www.researchgate.net/publication/237005499_Simple_Mathematical_Models_With_Very_Complicated_Dynamics) back in 1976, the logistic map is the most iconic and heavily researched chaotic maps in his history.
<!-- **To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`github_username`, `repo`, `twitter_handle`, `email` -->


### Built With

* [Electron](https://www.electronjs.org/)
* [React](https://reactjs.org/)


<!-- GETTING STARTED -->
## Getting Started

### Installation
Download the lateset stable distribution 

<img src="./app/assets/images/macos.png" alt="Logo" width="160" >
<img src="./app/assets/images/microsoft.png" alt="Logo" width="160" >
<img src="./app/assets/images/linux.png" alt="Logo" width="160" >

### Usage
**Step 1 )**  Enter the desired params for your choosen map as well as an output directory for the processed image

<img src="./app/assets/images/choose-param.png" alt="Logo" height="400px" >

<!-- [![Product Name Screen Shot][params-screenshot]]() -->

**Step 2 )**  Choose the desired image for encryption / decryption by drag-drop or clicking browse in the designated area.

**Step 3 )**  Press Encrypt / Decrypt and wait for your image to be processed. Once finished you will find the output at the path choosen for output directory with the name file appended to it either _encrypted / _decrypted.


[product-screenshot]: ./app/assets/images/screenshot.png
[params-screenshot]: ./app/assets/images/choose-param.png