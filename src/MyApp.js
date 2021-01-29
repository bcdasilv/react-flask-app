import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
//import RedditExample from './RedditExample';
import axios from 'axios';

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchAll().then( result => {
            if (result)
                setCharacters(result);
         });
    }, [] ); /* the brackets after the comma in this line set the effect hook 
                to be called only when the component mounts for the first time 
                 */

    function removeOneCharacter(index) {
        makeDeleteCall(characters[index].id).then( result => {
            if (result.status === 204) {
                const updated = characters.filter( (character, i) => {
                    return i !== index
                });
                setCharacters(updated);                
            }
        });
    }

    function updateList(person) { 
        makePostCall(person).then( response => {
            if (response.status === 201)
                setCharacters([...characters, response.data]);
         });
    }

    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data.users_list;
        }
        catch (error){
            //We're not handling errors. Just logging into the console.
            console.log(error);  
            return false;          
        }
    }

    async function makePostCall(person){
        try {
            const response = await axios.post('http://localhost:5000/users', person);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    async function makeDeleteCall(id){
        try {
            const response = await axios.delete('http://localhost:5000/users/'+id);
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
      </div>
    );
} 

export default MyApp;