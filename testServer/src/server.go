package main

import (
    "io"
    "fmt"
    "io/ioutil"
    "net/http"
    "encoding/json"
)

type UserInfo struct {
    Name string
    Gender string
    Region [3]string
    Date string
    Time string
}

//type RegionType struct {
//    Province string
//    City string
//    District string
//}

type Ret struct {
    Id string
    Name string
    Age int
}

func firstHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("accept request")
    var userInfo UserInfo
    body, _ := ioutil.ReadAll(r.Body)
    err := json.Unmarshal(body, &userInfo)
    if err != nil {
        fmt.Println("handle request success")
    }
    ret := new(Ret)
    ret.Id = "1"
    ret.Name = "王往往"
    ret.Age = 10
    ret_json,_ := json.Marshal(ret)
    io.WriteString(w, string(ret_json))
    fmt.Println(string(ret_json))
    fmt.Println(userInfo.Name)
    fmt.Println(userInfo.Gender)
    fmt.Println(userInfo.Region[0])
    fmt.Println(userInfo.Region[1])
    fmt.Println(userInfo.Region[2])
    fmt.Println(userInfo.Date)
    fmt.Println(userInfo.Time)
}

func main(){
    http.HandleFunc("/postdata", firstHandler)
    http.ListenAndServe(":8001", nil)
}
