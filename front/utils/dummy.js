import moment from "moment";


//moment valueOf 안붙이면 moment객체로 가는데 그것도 miliseconds로 인식하는듯?

export const dummyData = [
   
    {
        day: "2022-07-12",
        id: 2,
        memberId: 3,
        name: "유상우",
        startTime: moment('2022-07-12 13:30').valueOf(),
        endTime: moment('2022-07-12 15:00').valueOf(),

    },
    {
        day: "2022-07-14",
        id: 4,
        memberId: 3,
        name: "유상우",
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),

    },
    {
        day: "2022-07-12",
        id: 1,
        memberId: 3,
        name: "유상우",
        startTime: moment('2022-07-12 10:35').valueOf(),
        endTime: moment('2022-07-12 12:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 3,
        memberId: 2,
        name: "김현겸",
        startTime: moment('2022-07-12 16:30').valueOf(),
        endTime: moment('2022-07-12 17:30').valueOf(),
    },
    {
        day: "2022-07-31",
        id: 5,
        memberId: 1,
        name: "박건상",
        startTime: moment("2022-07-31 19:30").valueOf(),
        endTime: moment("2022-07-31 20:20").valueOf(),

    },
    {
        day: "2022-07-12",
        id: 6,
        memberId: 1,
        name: "박건상",
        startTime: moment('2022-07-12 18:35').valueOf(),
        endTime: moment('2022-07-12 19:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 7,
        memberId: 1,
        name: "박건상",
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 8,
        memberId: 3,
        name: "유상우",
        startTime: moment('2022-07-12 20:35').valueOf(),
        endTime: moment('2022-07-12 21:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 9,
        memberId: 3,
        name: "유상우",
        startTime: moment('2022-07-12 16:30').valueOf(),
        endTime: moment('2022-07-12 17:30').valueOf(),
    },
];


export const dummyHolidays = [
    {
        datekind: "01",
        dateName: "테스트1",
        isHoliday: "Y",
        locdate: 20220702,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트2",
        isHoliday: "Y",
        locdate: 20220712,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트3",
        isHoliday: "Y",
        locdate: 20220718,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트4",
        isHoliday: "Y",
        locdate: 20220729,
        seq: 1
    },
]


export const dummyMyInfo = {
    id: 1,
    name: "박건상",
    Posts: [
        {
            day: "2022-07-31",
            id: 5,
            memberId: 1,
            name: "박건상",
            startTime: moment("2022-07-31 19:30").valueOf(),
            endTime: moment("2022-07-31 20:20").valueOf(),
    
        },
        {
            day: "2022-07-12",
            id: 6,
            memberId: 1,
            name: "박건상",
            startTime: moment('2022-07-12 18:35').valueOf(),
            endTime: moment('2022-07-12 19:00').valueOf(),
        },
        {
            day: "2022-07-12",
            id: 7,
            memberId: 1,
            name: "박건상",
            startTime: moment('2022-07-12 19:30').valueOf(),
            endTime: moment('2022-07-12 20:30').valueOf(),
        },
    ]
}


export const dummyMyPosts = [
    {
        day: "2022-07-31",
        id: 5,
        memberId: 1,
        name: "박건상",
        startTime: moment("2022-07-31 19:30").valueOf(),
        endTime: moment("2022-07-31 20:20").valueOf(),

    },
    {
        day: "2022-07-12",
        id: 6,
        memberId: 1,
            name: "박건상",
        startTime: moment('2022-07-12 18:35').valueOf(),
        endTime: moment('2022-07-12 19:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 7,
        memberId: 1,
        name: "박건상",
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),
    },
]

export const findSinglePost = (id) => {
    
    const findPost = dummyMyInfo.Posts.find((it) => it.id === parseInt(id));
    if(findPost){
        console.log(dummyData.find((it) => it.id == parseInt(id)))
        return dummyData.find((it) => it.id == parseInt(id));
    }else{
        return {};
    }
}