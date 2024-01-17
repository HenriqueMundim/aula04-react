import cookieImg from './assets/cookieImg.png'
import styles from './App.module.css'
import { useEffect, useState } from 'react'

function App() {

  const [game, setGame] = useState({
    cookiesAmount: 0,
    superMouse: {
      amount: 0,
      price: 15
    },
    autoClicker: {
      amount: 0,
      price: 50,
      isActive: false
    }
  })

  useEffect(() => {
    if (game.autoClicker.isActive) {
      setInterval(() => {
        setGame(prev => {
          const newGame = {
            ...prev,
            cookiesAmount: prev.cookiesAmount + prev.autoClicker.amount
          }

          localStorage.setItem("game", JSON.stringify(newGame));
          return newGame;
        })
      }, 1000)
    }

    const savedGame = localStorage.getItem("game");
    if (savedGame) {
      setGame(JSON.parse(savedGame));
    }
  }, [])

  function handleSuperMouse() {
    if (game.cookiesAmount >= game.superMouse.price) {
      setGame((prev) => {
        const newGame = {
          ...prev,
          cookiesAmount: prev.cookiesAmount - prev.superMouse.price,
          superMouse: {
            amount: prev.superMouse.amount + 1,
            price: Math.floor(prev.superMouse.price * 1.3)
          }
        };

        localStorage.setItem("game", JSON.stringify(newGame));
        return newGame;
      })
    }
  }

  const handleCookieClick = () => {
    setGame((prev) => {
      const newGame = { ...prev, cookiesAmount: prev.cookiesAmount + 1 + prev.superMouse.amount };

      localStorage.setItem("game", JSON.stringify(newGame));
      return newGame;
    })
  }

  const handleAutomaticClick = () => {
    if (game.cookiesAmount >= game.autoClicker.price) {
      setGame((prev) => {
        const newGame = {
          ...prev,
          cookiesAmount: prev.cookiesAmount - prev.autoClicker.price,
          autoClicker: {
            price: Math.floor(prev.autoClicker.price * 1.3),
            amount: prev.autoClicker.amount + 1,
            isActive: true
          }
        }

        localStorage.setItem("game", JSON.stringify(newGame));
        return newGame;
      })
      setInterval(() => {
        setGame(prev => {
          const newGame = {
            ...prev,
            cookiesAmount: prev.cookiesAmount + prev.autoClicker.amount
          }

          localStorage.setItem("game", JSON.stringify(newGame));
          return newGame;
        })
      }, 1000)
    }
  }


  return (
    <main className={styles['container']}>
      <div className={styles['game-card']}>
        <div className={styles['cookie-display']}>
          <p>{game.cookiesAmount} COOKIES ({game.autoClicker.amount}/s)</p>
          <p>{1 + game.superMouse.amount} p/ click</p>
        </div>
        <button id={styles['button-cookie']} onClick={handleCookieClick}>
          <img src={cookieImg} alt="imagem cookie" />
        </button>
        <div className={styles['upgrade-buttons']}>
          <button onClick={handleSuperMouse}>Mouse poderoso ({game.superMouse.price})</button>
          <button onClick={handleAutomaticClick}>Clicador automático ({game.autoClicker.price})</button>
        </div>
      </div>
    </main >
  )
}

export default App
