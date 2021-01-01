with open('inputs/06.txt') as f:
    lines = list(f)
lines = list(map(lambda line: line.replace("\n", ''), lines))

TURN_ON = 'turn on'
TURN_OFF = 'turn off'
TOGGLE = 'toggle'
commands = (TURN_ON, TURN_OFF, TOGGLE)

lights = []
length = 1000
for i in range(0, length):
	lights.append([0] * length)

def getXY(str):
	return list(map(lambda n: int(n), str.split(',')))

for line in lines:
	lcom = ''
	for com in commands:
		if line.startswith(com):
			lcom = com
			break
	line = line.replace(lcom + ' ', '')
	line = line.split(' through ')
	start = getXY(line[0])
	finish = getXY(line[1])
	for x in range(start[0], finish[0] + 1):
		for y in range(start[1], finish[1] + 1):
			if lcom == TURN_ON or lcom == TOGGLE:
				inc = 1 if lcom == TURN_ON else 2
				lights[x][y] += inc
			elif lcom == TURN_OFF:
				lights[x][y] = max(0, lights[x][y] - 1)
tot = 0
for sub in lights:
	tot += sum(sub)
print(tot)