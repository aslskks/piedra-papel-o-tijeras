function check (num: number, num2: number) {
    if (num == num2) {
        basic.showLeds(`
            # . . . .
            . # . . .
            . . # . .
            . . . # .
            . . . . #
            `)
    } else if (num == 0 && num2 == 2) {
        basic.showIcon(IconNames.Yes)
    } else if (num == 1 && num2 == 0) {
        basic.showIcon(IconNames.Yes)
    } else if (num == 2 && num2 == 1) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
    basic.pause(500)
    basic.clearScreen()
    enemy_d = 0
    enemy = 0
    current = 0
    dicided = 0
    piedra()
}
radio.onReceivedNumber(function (receivedNumber) {
    enemy = receivedNumber
    enemy_d = 1
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    control.reset()
})
input.onButtonPressed(Button.A, function () {
    if (dicided == 0 && started == 1) {
        if (current == 0) {
            current = 2
            basic.showIcon(IconNames.Scissors)
        } else if (current == 1) {
            current = 0
            piedra()
        } else if (current == 2) {
            current = 1
            basic.showIcon(IconNames.Square)
        }
    }
})
function piedra () {
    basic.showLeds(`
        . . . . .
        . # # # .
        . # # # .
        . # # # .
        . . . . .
        `)
}
input.onButtonPressed(Button.AB, function () {
    if (dicided == 0 && started == 1) {
        radio.sendNumber(current)
        dicided = 1
    }
})
radio.onReceivedString(function (receivedString) {
    started = 1
    start()
})
input.onButtonPressed(Button.B, function () {
    if (dicided == 0 && started == 1) {
        if (current == 0) {
            current = 1
            basic.showIcon(IconNames.Square)
        } else if (current == 1) {
            current = 2
            basic.showIcon(IconNames.Scissors)
        } else if (current == 2) {
            current = 0
            piedra()
        }
    }
})
function start () {
    current = 0
    dicided = 0
    enemy_d = 0
    enemy = 0
    piedra()
}
let started = 0
let dicided = 0
let current = 0
let enemy = 0
let enemy_d = 0
radio.setGroup(1)
basic.forever(function () {
    if (started == 0) {
        radio.sendString("")
    }
})
basic.forever(function () {
    if (dicided == 1 && enemy_d == 1) {
        check(current, enemy)
    }
})
