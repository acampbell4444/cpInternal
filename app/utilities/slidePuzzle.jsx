export const createBoard = size => {
  const array = []
  for (let a = 0; a < size-1; a++) {
    array.push(a+1)
  }
  array.push('off')
  return shuffleArray(array)
}

const shuffleArray= array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export const manageTheDrop = (data, board) => {
  const boardState = board.concat()
  const offIndex = boardState.indexOf('off')
  let selectedIndex, value
  for (const cell in data) {
    if (data[cell]) {
      selectedIndex = cell
      value = +data[cell]
    }
  }
  boardState[offIndex]=value
  boardState[selectedIndex]='off'
  return boardState
}

export const determineDraggable = (board) => {
  const offIndex = board.indexOf('off')
  const draggableArray = []
  switch (offIndex) {
  case 0:
    draggableArray.push(1, 4)
    break
  case 1:
    draggableArray.push(0, 2, 5)
    break
  case 2:
    draggableArray.push(1, 3, 6)
    break
  case 3:
    draggableArray.push(2, 7)
    break
  case 4:
    draggableArray.push(0, 5, 8)
    break
  case 5:
    draggableArray.push(1, 4, 6, 9)
    break
  case 6:
    draggableArray.push(2, 5, 7, 10)
    break
  case 7:
    draggableArray.push(3, 6, 11)
    break
  case 8:
    draggableArray.push(4, 9, 12)
    break
  case 9:
    draggableArray.push(5, 8, 10, 13)
    break
  case 10:
    draggableArray.push(6, 9, 11, 14)
    break
  case 11:
    draggableArray.push(7, 10, 15)
    break
  case 12:
    draggableArray.push(8, 13)
    break
  case 13:
    draggableArray.push(9, 12, 14)
    break
  case 14:
    draggableArray.push(10, 13, 15)
    break
  case 15:
    draggableArray.push(11, 14)
    break
  default:
    return []
  }
  return draggableArray
}
