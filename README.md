# Quiztor

Quiztor is social media website/app for sharing opinions on various types 
of memes through posts or comments.

## Table of contents
* [Description](#description)
* [Getting Started](#getting-started)
* [Authors](#authors)

## Description

Posts take the form of image upload, title, and description. 
Comments are simply a description entered by the user which are 
then displayed below the post. In addition to the visual 
attributes of the post, there are two hidden attributes: label, and meme text. 
The meme text is acquired through image text extraction, and the 
label is generated using an image fine grained recognition model known as
MobileNet, which was trained on web data obtained through Google search. 
The user is able to perform a text search for specific meme types through 
the use of the hidden label and meme text, or upload an image and perform 
a reverse-image search for memes with the same label as the uploaded image.

[(Back to Top)](#table-of-contents)

## Getting Started

### Dependencies

Install Node.js version 16.14.1 and python version 3.9.

### Installing the client

With one of the terminals open, navigate to the quiztor folder and run:
```
npm install
```

### Installing the api

If using macOS, navigate to the link https://developer.apple.com/metal/tensorflow-plugin/ and follow the steps provided to install tensorflow on 
m1 macs.

Otherwise, create a virtual environment for python version 3.9. 

Install tensorflow version 2.6, pytesseract, opencv, and rake-nltk using pip.

YOU MUST DOWNLOAD NLTK STOPWORDS, AND PUNKT WHEN RUNNING PYTHON SCRIPT:
```
import nltk
nltk.download('stopwords')
nltk.download('punkt')
```

If using mac then installing tesseractact-ocr can be done with brew using:

```
brew install tesseract
```

If using windows than you need to obtain the .exe file of tesseract-ocr and 
chage the directory of 

```
pytesseract.pytesseract.tesseract_cmd=r'<your directory>/tesseract.exe'
```

and place this in line 95 in text_extract.py.

Navigate to the quiztor api folder and run:

```
npm install
```

### Connecting the database

You need to create an instance of mongodb cloud database and replace the first parameter in db-connection.js method with your username and password:

```
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.99goa.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology: true,
});
```

### Executing program

Have 2 terminals open. Navigate one to the quiztor folder, and the other to the quiztor_api folder.

Start each server by running the following command in each of the terminals:
```
npm start
```

Use the photos in the public folder as test images.

The quiztor api server port is 4200. Therefore the website will be localhost:4200.

[(Back to Top)](#table-of-contents)

## Authors

Contributors names

[cameodud234](https://github.com/cameodud234)
<br/>
[pmilkov](https://github.com/pmilkov)

[(Back to Top)](#table-of-contents)

## Version History

* 0.1
    * Initial Release


[(Back to Top)](#table-of-contents)

## Acknowledgments

Inspiration: https://arxiv.org/abs/2002.01462

[(Back to Top)](#table-of-contents)