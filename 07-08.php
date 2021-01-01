<?php
declare(strict_types = 1);

$res = [];
for ($i = 5; $i <= 6; $i++) {
	$sol = 0;
	while (true) {
		$pre = str_repeat('0', $i);
		if (substr(md5('bgvyzdsv'.$sol), 0, $i) === $pre) {
			$res[$i] = $sol;
			break;
		}
		$sol++;
	}	
}

echo "5: {$res[5]}\n";
echo "6: {$res[6]}\n";