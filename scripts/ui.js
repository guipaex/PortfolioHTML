
const cursor = document.querySelector('.cursor')

document.onload = mouseTracker();

function mouseTracker () {
	
	let mouseX = 0, mouseY = 0;
	let xPosition = 0, yPosition = 0;
	

	document.addEventListener('mousemove', (event) =>{
		mouseX = event.pageX;
		mouseY = event.pageY;
	})

	setInterval(() => {
		xPosition += ((mouseX - xPosition) /10);
		yPosition += ((mouseY - yPosition) /10)

		cursor.style.top = mouseY + "px";
		cursor.style.left = mouseX + "px"
	}, 20);
	
	
}

export default mouseTracker
