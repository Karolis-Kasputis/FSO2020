type Operation = 'multiply' | 'add' | 'divide'

const calculator = (a: number, b: number, op: Operation): number | string => {
  if (op === 'multiply') {
    return a * b
  }
  if (op === 'add') {
    return a + b
  }
  if (op === 'divide') {
    if (b === 0) return "can't divide by 0!"
    return a / b
  }
  return 'BAD OPERATION'
}

calculator(5, 5, 'add')
