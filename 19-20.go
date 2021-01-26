package main

import (
	"bytes"
	"fmt"
	"strconv"
)

func main() {
	str := "1321131112"
	for i := 0; i < 50; i++ {
		cc := 1
		buff := bytes.NewBufferString("")
		for j := 0; j < len(str)-1; j++ {
			if str[j] == str[j+1] {
				cc++
			} else {
				buff.WriteString(strconv.Itoa(cc))
				buff.WriteByte(str[j])
				cc = 1
			}
		}
		if cc > 0 {
			buff.WriteString(strconv.Itoa(cc))
			buff.WriteByte(str[len(str)-1])
		}
		str = buff.String()
		if i == 39 || i == 49 {
			fmt.Println(i+1, len(str))
		}
	}
}
