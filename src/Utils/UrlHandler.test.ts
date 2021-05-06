import { isURLValid, isSuperSet, charsAvailable} from "./UrlHandler"
import { expect } from 'chai';

it('checks for invalid url', () => {
    expect(isURLValid("//1234")).to.equal(false);
});

it('verifies invalid characters will not be apart of the generated slug', () => {
    expect(isSuperSet(charsAvailable,"}{;:/?>.<,)-_=+*&^%$#@!~")).to.equal(false);
});

