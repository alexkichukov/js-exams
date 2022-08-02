const gridSize = 20
const gridWidth = 40
const gridHeight = 30

// Initialize 2d grid array
const grid = Array(gridHeight)
for (let i = 0; i < gridHeight; i++) grid[i] = Array(gridWidth).fill(false)

function setup() {
  createCanvas(gridSize * gridWidth, gridSize * gridHeight)
  background(197, 128, 255)
  stroke(40, 11, 64)
  fill(40, 11, 64)
}

function getCell(x, y) {
  if (cellExists(x, y)) return grid[y][x]
  else throw new Error(`Cell with coordinates (${x}, ${y}) does not exist.`)
}

function setCell(x, y, value) {
  if (typeof value !== 'boolean') throw new Error('Cell values should be boolean')

  if (cellExists(x, y)) grid[y][x] = value
  else throw new Error(`Cell with coordinates (${x}, ${y}) does not exist.`)
}

function cellExists(x, y) {
  if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return false
  return true
}

// Returns an array of { x: number, y: number, visited: boolean, direction: string }
function getNeighbours(x, y) {
  const neighbours = []
  function addNeighbour(x, y, visited, direction) {
    neighbours.push({ x, y, visited, direction })
  }
  if (cellExists(x, y - 1)) addNeighbour(x, y - 1, getCell(x, y - 1), 'top')
  if (cellExists(x + 1, y)) addNeighbour(x + 1, y, getCell(x + 1, y), 'right')
  if (cellExists(x, y + 1)) addNeighbour(x, y + 1, getCell(x, y + 1), 'bottom')
  if (cellExists(x - 1, y)) addNeighbour(x - 1, y, getCell(x - 1, y), 'left')

  return neighbours
}

function getUnvisited(neighbours) {
  return neighbours.filter(({ visited }) => visited === false)
}

function removeWall(x, y, direction) {
  x *= gridSize
  y *= gridSize
  let xg = x + gridSize
  let yg = y + gridSize
  switch (direction) {
    case 'top':
      line(x + 1, y, xg - 1, y)
      break
    case 'right':
      line(xg, y + 1, xg, yg - 1)
      break
    case 'bottom':
      line(x + 1, yg, xg - 1, yg)
      break
    case 'left':
      line(x, y + 1, x, yg - 1)
      break
    default:
      throw new Error('Invalid direction.')
  }
}

function randCell(cells) {
  let randIndex = Math.floor(random(cells.length))
  return cells[randIndex]
}

const stack = [[0, 0]]

function draw() {
  if (stack.length > 0) {
    const [currentX, currentY] = stack.pop()
    setCell(currentX, currentY, true)

    square(currentX * gridSize + 1, currentY * gridSize + 1, gridSize - 2)

    const unvisitedNeighbours = getUnvisited(getNeighbours(currentX, currentY))
    if (unvisitedNeighbours.length > 0) {
      stack.push([currentX, currentY])
      const target = randCell(unvisitedNeighbours)
      removeWall(currentX, currentY, target.direction)
      setCell(target.x, target.y, true)
      stack.push([target.x, target.y])
    }
  }
}
