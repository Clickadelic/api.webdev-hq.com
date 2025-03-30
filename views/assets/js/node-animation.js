if (window.location.pathname === "/") {
	document.addEventListener("DOMContentLoaded", function () {
		const canvas = document.getElementById("api-nodes")
		const ctx = canvas.getContext("2d")

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const nodes = []
		const connections = []

		function createNodes(count) {
			for (let i = 0; i < count; i++) {
				nodes.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: 5 + Math.random() * 5,
					speedX: (Math.random() - 0.5) * 1.2,
					speedY: (Math.random() - 0.5) * 1.2
				})
			}
		}

		function createConnections() {
			nodes.forEach((node, i) => {
				for (let j = i + 1; j < nodes.length; j++) {
					if (Math.random() > 0.7) {
						connections.push({ from: node, to: nodes[j] })
					}
				}
			})
		}

		function updateNodes() {
			nodes.forEach(node => {
				node.x += node.speedX
				node.y += node.speedY

				if (node.x <= 0 || node.x >= canvas.width) node.speedX *= -1
				if (node.y <= 0 || node.y >= canvas.height) node.speedY *= -1
			})
		}

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			connections.forEach(connection => {
				ctx.beginPath()
				ctx.moveTo(connection.from.x, connection.from.y)
				ctx.lineTo(connection.to.x, connection.to.y)
				ctx.strokeStyle = "rgba(133, 133, 133, 0.25)"
				ctx.lineWidth = 1
				ctx.stroke()
			})

			nodes.forEach(node => {
				ctx.beginPath()
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
				ctx.fillStyle = "#1a90fd"
				ctx.fill()
			})
		}

		function animate() {
			updateNodes()
			draw()
			requestAnimationFrame(animate)
		}

		createNodes(20)
		createConnections()
		animate()
	})
}
