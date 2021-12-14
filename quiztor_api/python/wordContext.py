from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import wordnet


class WordContext:

    def __init__(self, words: str) -> None:
        self._words = word_tokenize(words)
        self._synonyms = set()
        self._antonyms = set()
    
    def getSynonyms(self) -> list:
        for word in self._words:
            syns = wordnet.synsets(word)
            for syn in syns:
                lemmas = syn.lemmas()
                for lemma in lemmas:
                    self._synonyms.add(lemma.name())
        return list(self._synonyms)

    # def getContext(self): this needs to be used to get meaningful
    # context of search terms

    # def getAntonyms(self) -> list:
    #     for word in self._words:
    #         syns = wordnet.synsets(word).antonyms()
    #         for syn in syns:
    #             lemmas = syn.lemmas()
    #             for lemma in lemmas:
    #                 self._antonyms.add(lemma.name())
    #     return self._antonyms