import { get } from "superagent";

const todosUrl = 'https://jsonplaceholder.typicode.com/todos/';

export async function getTodos() {

	// Sequentially
    const startSeq = new Date().getTime();

	const response1 = await get(`${todosUrl}1`);
	const response2 = await get(`${todosUrl}2`);
	const response3 = await get(`${todosUrl}3`);

    const endSeq = new Date().getTime();
    const totalSeq = endSeq - startSeq;
    console.log('totalSeq: ', totalSeq);
	
	// In parallel
    const startParallel = new Date().getTime();
	const gets = [
		get(`${todosUrl}1`),
		get(`${todosUrl}2`),
		get(`${todosUrl}3`),
	]
	const responses = await Promise.all(gets);
    const endParallel = new Date().getTime();
    const totalParallel = endParallel - startParallel;
    console.log('totalParallel: ', totalParallel);
	// access individual responses with responses[1]
    // console.log('Response 1:', response1.body);
    return responses.map(resp => resp.body);
}