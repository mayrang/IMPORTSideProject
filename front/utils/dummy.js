import moment from "moment";

export const dummyData = [
   
    {
        day: "2022-07-12",
        id: 2,
        User: {
            id: 3,
            name: "유상우"
        },
        startTime: moment('2022-07-12 13:30').valueOf(),
        endTime: moment('2022-07-12 15:00').valueOf(),

    },
    {
        day: "2022-07-14",
        id: 4,
        User: {
            id: 3,
            name: "유상우"
        },
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),

    },
    {
        day: "2022-07-12",
        id: 1,
        User: {
            id: 3,
            name: "유상우"
        },
        startTime: moment('2022-07-12 10:35').valueOf(),
        endTime: moment('2022-07-12 12:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 3,
        User: {
            id: 2,
            name: "김현겸"
        },
        startTime: moment('2022-07-12 16:30').valueOf(),
        endTime: moment('2022-07-12 17:30').valueOf(),
    },
    {
        day: "2022-07-29",
        id: 5,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment().valueOf(),
        endTime: moment().valueOf(),

    },
    {
        day: "2022-07-12",
        id: 6,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 18:35').valueOf(),
        endTime: moment('2022-07-12 19:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 7,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 8,
        User: {
            id: 3,
            name: "유상우"
        },
        startTime: moment('2022-07-12 20:35').valueOf(),
        endTime: moment('2022-07-12 21:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 9,
        User: {
            id: 3,
            name: "유상우"
        },
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
            id: 5,
        },
        {
            id: 6,
        },
        {
            id: 7,
        },
    ]
}


export const dummyMyPosts = [
    {
        day: "2022-07-29",
        id: 5,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment().valueOf(),
        endTime: moment().valueOf(),

    },
    {
        day: "2022-07-12",
        id: 6,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 18:35').valueOf(),
        endTime: moment('2022-07-12 19:00').valueOf(),
    },
    {
        day: "2022-07-12",
        id: 7,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),
    },
]