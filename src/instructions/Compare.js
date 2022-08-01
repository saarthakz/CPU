
export default function compare(processor, first, second) {
  if (second.identifier == 35)
    processor[`reg${String.fromCharCode(first.operand + 64)}`] = Number((second.operand) == processor[`reg${String.fromCharCode(first.operand + 64)}`]);
  else processor[`reg${String.fromCharCode(first.operand + 64)}`] = Number((processor[`reg${String.fromCharCode(second.operand + 64)}`]) == processor[`reg${String.fromCharCode(first.operand + 64)}`]);
}
