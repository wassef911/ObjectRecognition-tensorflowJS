export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        const [x, y, width, height] = prediction["bbox"];
        const text = prediction['class'];
        const color = 'red'
        ctx.strokeStyle = color;
        ctx.font = "30px Arial";
        ctx.fillStyle = color;
        ctx.lineWidth = 5;

        ctx.beginPath()
        ctx.fillText(text, x, y)
        ctx.rect(x, y, width, height)
        ctx.stroke()
    })
}