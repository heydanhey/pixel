import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ControlledPixel, Button } from '@heydan/core'
import { useEffect, useState } from 'react'

export default function Home() {
  const arr = Array(8).fill(0).map((m, i) => (
    Array(8).fill(false)
  ));

  const [grid, setGrid] = useState(arr);

  useEffect(() => {
    const savedGrid = localStorage.getItem('grid');
    if (savedGrid) {
      setGrid(JSON.parse(savedGrid));
    }
  }, [])

  const handleClick = (e,x,y) => {
    const newGrid = [...grid]
    if (e.type === 'mousedown') {
      newGrid[x][y] = !grid[x][y];
      setGrid(newGrid);
      return;
    }

    if (e.type === 'mouseover' && e.buttons) {
      newGrid[x][y] = true;
      setGrid(newGrid);
    }
  }

  const onSave = () => {
    localStorage.setItem('grid', JSON.stringify(grid))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Pixel</title>
        <meta name="description" content="Pixl App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{
          display: 'flex',
          height: '100%',
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {grid.map((m, x) => (
            <div style={{
              flex: '0 0 100px',
            }} key={x}>
              {m.map((m, y) => <ControlledPixel
                key={y}
                onMouseDown={(e) => handleClick(e, x, y)}
                onMouseOver={(e) => handleClick(e, x, y)}
                isActive={m}
                style={{margin: '-5px 0', border: '0.5px solid lightgray'}}
              />)}
            </div>
          ))}
        </div>
        <Button onClick={onSave}>Save</Button>
      </main>
    </div>
  )
}
