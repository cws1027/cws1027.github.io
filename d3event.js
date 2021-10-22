class D3Event {
    constructor() {
        this.images = [
            {src: 'twitter.png', name: 'Twitter', link: 'https://twitter.com/'},
            {src: 'facebook.png', name: 'Facebook', link: 'https://www.facebook.com/'},
            {src: 'reddit.png', name: 'Reddit', link: 'https://www.reddit.com/'},
            {src: 'linkedin.png', name: 'LinkedIn', link: 'https://www.linkedin.com/'},
            {src: 'instagram.png', name: 'Instagram', link: 'https://www.instagram.com/'}
        ]
    }

    handleMouseEnter(name) {
        this.div1.text(`In: ${name}`);
    }

    handleMouseLeave(name) {
        this.div2.text(`Out: ${name}`);
    }

    handleMouseMove(x, y) {
        this.div3.text(`Mouse X: ${x}, Y: ${y}`);
    }

    handleDblClick(link) {
        window.open(link, '_blank');
    }

    loadImages() {
        let self = this;

        // add 1 span
        let span = d3.select("body")
            .append("span")
            .style('display', 'inline-block')
            .on('mousemove', function(e) {
                let mouse = d3.pointer(e);
                self.handleMouseMove(mouse[0], mouse[1]);
            });

        // loop over each of the icons. place them on the screen and add the mouse events
        // my custom mousedown/mouseup events are to have the icon spin in place
        for (let img of this.images) {
            span.append("img")
                .attr("src", `./icons/${img.src}`)
                .attr("width", 100)
                .attr("height", 100)
                .style("padding-right", "2px")
                .on("mouseenter", function() {
                    self.handleMouseEnter(img.name)
                    d3.select(this)
                        .style("transition-duration", "0s") // need to set this because my custom mousedown/mouseup functions mess with transitions
                        .style("opacity", 0.5);
                })
                .on("mouseleave", function() {
                    self.handleMouseLeave(img.name);
                    d3.select(this)
                        .style("transition-duration", "0s") // need to set this because my custom mousedown/mouseup functions mess with transitions
                        .style("opacity", 1)
                })
                .on("dblclick", function() {
                    self.handleDblClick(img.link);
                })
                .on("mousedown", function() {
                    d3.select(this)
                        .style("transition-duration", "1s")
                        .style("transform", "rotate(360deg)");
                })
                .on("mouseup", function() {
                    d3.select(this)
                        .style("transition-duration", "1s")
                        .style("transform", "rotate(0deg)");
                })
        }
    }

    // add three divisons
    loadDivs() {
        this.div1 = d3.select("body")
            .append("div")
            .attr("class", "div1")
            .text("In: ")

        this.div2 = d3.select("body")
            .append("div")
            .attr("class", "div2")
            .text("Out: ")

        this.div3 = d3.select("body")
            .append("div")
            .attr("class", "div3")
            .text("Mouse X: , Y:")
    }
}


window.onload = function() {
    let myEvent = new D3Event();
    myEvent.loadImages();
    myEvent.loadDivs();
}