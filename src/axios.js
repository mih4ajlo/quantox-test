import axios from 'axios';


const instance = axios.create({
	baseURL: 'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
	
	headers:{
		'Content-Type' : 'application/json',		
		'X-CMC_PRO_API_KEY':'1676cd15-5b2f-476a-b97d-4f6ccbd554d8',		
	},
	
})


export default instance;