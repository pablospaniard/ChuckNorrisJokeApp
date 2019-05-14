# Chuck Norris Joke App :punch:

### To start this project

```
 clone this repo
 run `yarn install`
 run `yarn start`
 go to `http://localhost:1234`
```

---

#### First part

- [x] Application where we can fetch 10 Random Chuck Norris jokes
- [x] When these jokes are fetched via a button they need to be displayed in a
      list
- [x] In this list we can mark certain jokes as favourite
- [x] The favourite jokes will appear in a favourites list with a max of 10
      (unique) items
- [x] There should be an option to remove jokes from the favourite list as well.
- [ ] On refresh the favourites lists should be maintained.
- [x] We can also turn on/off a timer via a button (every 5 seconds) who will
      add one random joke to the favourites list

#### Second part

- [ ] Create a login popup that will log you in for the current session. And
      only appear when the user hasn't logged in yet for the current session.
- [ ] The login form should consist of a username and password which must comply
      to the following password security requirements:
  1. Passwords must include one increasing straight of at least three letters,
     like abc , cde , fgh , and so on, up to xyz . They cannot skip letters; acd
     doesn't count.
  2. Passwords may not contain the letters i, O, or l, as these letters can be
     mistaken for other characters and are therefore confusing.
  3. Passwords must contain at least two non-overlapping pairs of letters, like
     aa, bb, or cc.
  4. Passwords cannot be longer than 32 characters.
  5. Passwords can only contain lower case alphabetic characters.
