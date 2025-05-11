console.log('Hey does this thing work')

const btn = document.querySelectorAll('button')

btn.forEach(btn => {
    btn.addEventListener('click', getData);
  });

  async function getData() {
    const url = "http://localhost:3000/addCart";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(response)
    } catch (error) {
      console.error(error.message);
    }

 
  }