/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var drawCard = (name, phone) => {
    return `
<div class="card mb-3" style="max-width: 100%;">
<div class="row no-gutters">
    <div class="col-2 my-auto">
        <img src="./img/person.png"
            class="card-img" alt="...">
    </div>
    <div class="col-8">
        <div class="card-body">
            <h5 class="card-title">${phone}</h5>
            <p class="card-text">${name}</p>
        </div>
    </div>
    <div class="col-2 my-auto">
        <img src="./img/phone-icon.jpg"
            style="max-width:50px" class="card-img" alt="...">
    </div>
</div>
</div>
`};

var list = [];
var app = {
    initialize: async function () {
        console.log(localStorage.getItem('userId')) 
        const data = await fetch(`http://127.0.0.1:8080/contactApp/search.php?id=${localStorage.getItem('userId')}`)
        const result = await data.json()
        list = result;
        let contacts = '';
        result.map(contact => contacts += drawCard(contact.fullName, contact.phone));
        document.querySelector('#list').innerHTML = contacts;
    },
    search: (event) => {
        let contacts = '';
        list.filter(e => JSON.stringify(e).includes(event.value)).map(contact => contacts += drawCard(contact.fullName, contact.phone));
        document.querySelector('#list').innerHTML = contacts;
    }
};
