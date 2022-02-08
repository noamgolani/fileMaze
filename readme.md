## file maze

A script for generating a file-maze

### maze example
```
├── chest-1.json
├── chest-3.json
├── room-0
│   ├── room-0
│   ├── room-1
│   └── room-2
│       └── chest-1.json
├── room-1
│   ├── room-0
│   ├── room-1
│   │   └── chest-1.json
│   ├── room-2
│   ├── room-3
│   └── room-4
├── room-2
│   ├── room-0
│   ├── room-1
│   ├── room-2
│   └── room-3
│       ├── chest-1.json
│       ├── chest-2.nosj
│       └── chest-3.json
├── room-3
│   ├── room-0
│   ├── room-1
│   ├── room-2
│   │   ├── chest-1.json
│   │   ├── chest-2.nosj
│   │   └── chest-3.json
│   ├── room-3
│   │   └── chest-1.json
│   └── room-4
└── room-4
    └── room-0
```

then two way to solve it, one using callbacks (async) and one sync

### solution example

```
Opening chest: maze/chest-3.json
Going to room: ./bad/file/path
Cant find the door to room: ./bad/file/path
Opening chest: maze/chest-1.json
Going to room: ./maze/room-0/room-2
Opening chest: maze/room-0/room-2/chest-1.json
Going to room: ./maze/room-3/room-3
Opening chest: maze/room-3/room-3/chest-1.json
Going to room: ./maze/room-1/room-1
Opening chest: maze/room-1/room-1/chest-1.json
Going to room: ./maze/room-3/room-2
Opening chest: maze/room-3/room-2/chest-3.json
Going to room: ./bad/file/path
Cant find the door to room: ./bad/file/path
Opening chest: maze/room-3/room-2/chest-2.nosj
Cant open chest: maze/room-3/room-2/chest-2.nosj
Opening chest: maze/room-3/room-2/chest-1.json
Going to room: ./maze/room-2/room-3
Opening chest: maze/room-2/room-3/chest-3.json
Going to room: ./bad/file/path
Cant find the door to room: ./bad/file/path
Opening chest: maze/room-2/room-3/chest-2.nosj
Cant open chest: maze/room-2/room-3/chest-2.nosj
Opening chest: maze/room-2/room-3/chest-1.json
Found: maze/room-2/room-3/chest-1.json
```

## To run

`npm run generate` - creates a new random maze folder

`npm run clean` - removes the maze diractory (works on bash)

`npm run sync` - runs the sync script

`npm run callback` - runs the callback script
