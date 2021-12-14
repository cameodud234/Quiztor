import sys
from wordContext import WordContext 

if __name__ == '__main__':
    wordSearch = sys.argv[1]
    myWordContext = WordContext(wordSearch)
    print(myWordContext.getSynonyms())