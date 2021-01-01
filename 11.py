with open('inputs/06.txt') as f:
    lines = list(f)
lines = list(map(lambda line: line.replace("\n", ''), lines))

def getXY(str):
	return list(map(lambda n: int(n), str.split(',')))

length = 1000
ons = dict()

TURN_ON = 'turn on'
TURN_OFF = 'turn off'
TOGGLE = 'toggle'
commands = (TURN_ON, TURN_OFF, TOGGLE)

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
		rl = finish[1] - start[1] + 1
		if lcom == TURN_ON:
			if not ons.get(x):
				ons[x] = '0' * length
			ons[x] = ons[x][0:start[1]] + '1' * rl + ons[x][finish[1]+1:]
		elif lcom == TURN_OFF:
			if ons.get(x):
				ons[x] = ons[x][0:start[1]] + '0' * rl + ons[x][finish[1]+1:]
		else:
			if not ons.get(x):
				ons[x] = '0' * length
			toggled = ''.join(map(lambda c: '1' if c == '0' else '0', list(ons[x][start[1]:finish[1] + 1])))
			ons[x] = ons[x][0:start[1]] + toggled + ons[x][finish[1]+1:]
tot = 0
for sub in ons:
	tot += ons[sub].count('1')
print(tot)