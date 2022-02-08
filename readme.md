## file maze

A script for generating a file-maze

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

## To run

`npm run generate` - creates a new random maze folder

`npm run clean` - removes the maze diractory (works on bash)

`npm run sync` - runs the sync script

`npm run callback` - runs the callback script
