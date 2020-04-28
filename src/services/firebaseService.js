import firebase from '../config/firebaseConfig';
const db = firebase.firestore();
const stashCollection = db.collection('stashes');

const getAll = async () => {
    const stashes = await stashCollection.get();
    return stashes;
}

const addData = async (stash) => {
    const newStash = await stashCollection.add(stash);
    return newStash;
}

export default { getAll, addData }