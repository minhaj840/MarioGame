
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.valocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x,
            this.position.y, this.width, this.height
        )
    }
    update() {
        this.draw()
        this.position.y += this.valocity.y
        this.position.x += this.valocity.x

        if (player.position.y + this.height + this.valocity.y <= canvas.height)
            this.valocity.y += gravity
        else this.valocity.y = 0

    }
}
class Platform {
    constructor({x,y}) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


const player = new Player()

const platforms = [new Platform({
    x:200,
    y:100
}),new Platform({x:500,y:200})]

const keys = {
    right: {
        pressed: false
    },
    left:
    {
        pressed: false
    }
}

let scrollOfSet =  0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })


    if (keys.right.pressed && player.position.x < 400) {
        player.valocity.x = 5
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.valocity.x = -5
    }
    else {

        player.valocity.x = 0
        if (keys.right.pressed) {
            scrollOfSet +=5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })

        } else if (keys.left.pressed) {
            scrollOfSet -=5
            platforms.forEach(platform => {
                platform.position.x += 5
            })

        }
        
    }
    // platform collision 
    platforms.forEach(platform => {
      

        if (player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.valocity.y >=
            platform.position.y && player.position.x + player.width >=
            platform.position.x && player.position.x
            <= platform.position.x + platform.width) {
            player.valocity.y = 0
        }
    })
    if(scrollOfSet >2000){
        console.log('you win')
    }
}
animate()

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = true
            // player.valocity.x =1
            break
        case 87:
            console.log('up')
            player.valocity.y -= 20
            break

    }
})
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break

        case 83:
            console.log('down')
            break

        case 68:
            console.log('right')
            keys.right.pressed = false

            break
        case 87:
            console.log('up')
            player.valocity.y -= 20
            break

    }
})