import { useAppKit } from '@reown/appkit/react'

export default function ConnectButton({buttn}) {
  // 4. Use modal hook
  const { open } = useAppKit()

  return (
    <>
      <button className='follow' onClick={() => open()}>{buttn}</button>
      {/* <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
    </>
  )
}