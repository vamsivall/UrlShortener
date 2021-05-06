import firebase from '../configs/firebase';

interface IURLShortenerDoc {
    originalUrl:string,
    createdDate:Date
}

export const INVALID_SLUG = "Slug is invalid";
export const URL_INVALID = "URL is invalid!";
export const SLUG_NOTFOUND = "URL is invalid!";

export const charsAvailable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('');

const urlMapCollection = firebase.firestore().collection("urlmaps");

export const isURLValid = (urlToCheck:string):boolean => {
    let url;

    try {
      url = new URL(urlToCheck);
    } catch (ex) {
      return false;  
    }

    return true;
}

const generateShortenedString = ():string => {
    let shortenedString ='';
    for (let i = 0; i < 7; i++) {
        shortenedString += charsAvailable[Math.floor(Math.random() * charsAvailable.length)];
    }
    return shortenedString;
}

export const isSuperSet = (parent, child) => {
    for (let element of child) {
      if (!parent.includes(element)) return false;
    }
    return true;
  }


export const shortenUrl = (urlToShorten):Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!isURLValid(urlToShorten)) {
            reject(URL_INVALID);
            return;
        }
        
        // Given that the slug that is being generated has a liklihood of creating the same combination of characters
        // is (62)^7 or 1 in 3,521,614,606,208 - I'm opting to trust that I wont encounter a duplicate string for this
        // exercise.
        let urlSlug = generateShortenedString();
        let newUrlMap:IURLShortenerDoc = {
            originalUrl: urlToShorten,
            createdDate: new Date()
        }

        urlMapCollection.doc(urlSlug).set(newUrlMap).then(() => {
            resolve(window.location.origin +"/" + urlSlug);
        }).catch(error => {
            reject("Error: " + error);
        })   
    });   
}

export const getOriginalUrl = (urlSlug):Promise<any> => {
    return new Promise((resolve,reject) => {
        let urlSlugArr = urlSlug.split('');
        if (urlSlugArr.length != 7 || !isSuperSet(charsAvailable,urlSlugArr)) {
            reject(INVALID_SLUG);
            return;
        }

        urlMapCollection.doc(urlSlug).get().then((doc) => {
            if (doc.exists) {
                resolve((doc.data() as IURLShortenerDoc).originalUrl);
            } else {
                reject(SLUG_NOTFOUND);
            }
        }).catch((error) => {
            reject("Error: " + error);
        });
    });
}