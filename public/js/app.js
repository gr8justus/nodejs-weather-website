'use strict';

const form = document.querySelector('form');
const input = document.querySelector('input');
const print = document.querySelector('.print');

input.focus();

const address = form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchAddress = input.value;

    let result = 'Loading...'
    print.innerHTML = result

    fetch(`/weather?address=${searchAddress}`).then((res) => {
        res.json().then((data) => {

            if (data.error) {
                result = `<p>${data.error}</p>`;
                return print.innerHTML = result
            }

            result = `<p>${data.location}</p>`;
            result += `<p>${data.forecast}</p>`;
            print.innerHTML = result
        })
    })

    input.value = '';
    input.focus();
})