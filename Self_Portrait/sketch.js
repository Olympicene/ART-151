let bgImage;
let point_cloud = [];
let frame = 0;

let hair = [[389, 209], [441, 207], [463, 222], [494, 235], [516, 255], [534, 287], [540, 314], [534, 337], [540, 363], [540, 380], [524, 373], [513, 382], [502, 400], [495, 378], [482, 360], [461, 348], [443, 325], [412, 326], [391, 321], [346, 314], [314, 333], [304, 342], [297, 372], [291, 393], [284, 419], [270, 371], [251, 338], [262, 295], [254, 288], [272, 250], [302, 228], [340, 213], [363, 211]]
let ear = [[504, 401], [501, 418], [497, 438], [511, 452], [527, 442], [534, 419], [541, 396], [539, 382], [522, 371], [514, 385]]
let face = [[344, 306], [299, 331], [285, 407], [291, 425], [297, 440], [310, 489], [339, 542], [398, 564], [453, 529], [480, 491], [502, 448], [496, 435], [497, 397], [492, 373], [477, 347], [458, 343], [444, 320], [412, 320], [346, 308], [291, 335]]
let mask = [[294, 421], [357, 408], [373, 399], [397, 407], [475, 408], [470, 472], [486, 495], [458, 531], [430, 551], [407, 562], [378, 564], [351, 553], [322, 518], [304, 494], [295, 454]]
let neck = [[502, 455], [506, 481], [513, 505], [476, 537], [446, 565], [418, 591], [398, 599], [369, 581], [348, 565], [343, 547], [371, 562], [398, 561], [441, 546], [460, 521], [478, 498], [482, 478], [491, 464]]

let hood_inside = [[552, 466], [508, 481], [333, 530], [315, 541], [280, 571], [312, 569], [366, 579], [396, 598], [435, 581], [470, 550], [505, 521], [518, 497]]
let hood_outside = [[545, 469], [527, 489], [501, 518], [461, 549], [440, 578], [408, 596], [371, 587], [339, 570], [307, 567], [274, 573], [285, 591], [320, 604], [356, 620], [387, 619], [414, 619], [475, 602], [507, 591], [537, 580], [558, 566], [591, 546], [625, 556], [598, 538], [582, 518], [559, 506], [560, 478], [546, 463]]
let left_arm = [[287, 586], [248, 610], [217, 628], [187, 655], [170, 689], [157, 724], [149, 776], [129, 839], [120, 886], [225, 889], [214, 853], [203, 815], [191, 773], [194, 735], [207, 692], [223, 661], [242, 638], [281, 609], [304, 595]]
let right_arm = [[606, 552], [636, 560], [673, 585], [703, 602], [734, 646], [756, 705], [767, 750], [770, 800], [786, 866], [786, 885], [649, 889], [655, 800], [657, 748], [660, 686], [650, 641], [626, 590], [596, 572], [563, 555]]
let chest = [[299, 593], [263, 617], [230, 646], [211, 684], [195, 724], [192, 776], [201, 818], [220, 884], [244, 890], [294, 890], [365, 889], [433, 888], [505, 892], [565, 890], [645, 884], [654, 776], [657, 698], [650, 643], [627, 596], [606, 578], [569, 554], [535, 572], [485, 597], [443, 606], [397, 613], [352, 611], [303, 593]]
earrings = [ [ 517, 440 ], [ 523, 440], [ 523, 452 ], [ 517, 452 ] ]

let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, width)
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function draw() {
  fill('white')

  background(mouseX, mouseY, 100)

  for(i = 0; i < windowWidth; i += width/20) {
    for(j = 0; j < windowHeight; j += height/10) {
      ellipse(mod((i - x), windowWidth), j, 50)
    }
  }

  me((x+1000) % width, 0,  'red')
  me((x+800) % width, 0, 'orange')
  me((x+600) % width, 0, 'yellow')
  me((x+400) % width, 0, 'green')
  me((x+200) % width, 0, 'blue')
  me((x+0) % width, 0, 'purple')



  // me(x)

  x++;

  frame++;
}

function me(xOffset=0, yOffset=0, shirtcolor = 'green') {
  drawShape(chest, shirtcolor, xOffset, yOffset)
  drawShape(right_arm, shirtcolor, xOffset, yOffset)
  drawShape(left_arm, shirtcolor, xOffset, yOffset)
  drawShape(hood_inside, shirtcolor, xOffset, yOffset)
  drawShape(hood_outside, shirtcolor, xOffset, yOffset)

  drawShape(face, '#EAC086', xOffset, yOffset);
  drawShape(mask, '#36454f', xOffset, yOffset);
  drawShape(ear, '#EAC086', xOffset, yOffset);
  drawShape(hair, '#2b2a29', xOffset, yOffset);
  drawShape(neck, '#EAC086', xOffset, yOffset);

  drawShape(earrings, 'black', xOffset, yOffset)
}

function drawShape(point_cloud, color, xOffset=0, yOffset=0) {
  stroke('black')
  fill(color)
  strokeWeight(3)
  beginShape();
  for (let [x, y] of point_cloud) {
    vertex((x + xOffset), (y + yOffset));
  }
  endShape(CLOSE);
}

function mousePressed() {
  strokeWeight(10)
  stroke('red')
  point(mouseX, mouseY)
  if (!point_cloud.indexOf([mouseX, mouseY]) > -1) {
    point_cloud.push([mouseX, mouseY])
    print(point_cloud)
  }
}

