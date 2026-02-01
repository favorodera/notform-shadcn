// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function (data: any) {
  toast('You submitted the following values:', {
    description: h('pre',
      { class: 'text-foreground text-de mt-2 w-[320px] overflow-x-auto rounded-md p-4' },
      h('code', JSON.stringify(data, null, 2)),
    ),
    position: 'top-center',
    class: 'flex flex-col gap-2',
    style: {
      '--border-radius': 'calc(var(--radius)  + 4px)',
    },
  })
}
