import React from 'react'
import katex from 'katex'

interface MathTextProps {
  text: string
  className?: string
  block?: boolean
}

/**
 * Renders strings containing inline LaTeX ($...$) and display LaTeX ($$...$$)
 * cleanly using KaTeX. Supports **bold** markdown inside prose segments as well.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '', block = false }) => {
  if (block) {
    try {
      const html = katex.renderToString(text, {
        displayMode: true,
        throwOnError: false,
        strict: false,
      })
      return (
        <div
          className={`katex-block ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    } catch {
      return <div className={className}>{text}</div>
    }
  }

  // Split by $$...$$ first, then $...$
  const tokens: Array<{ type: 'text' | 'inline' | 'display'; value: string }> = []
  const regex = /(\$\$[\s\S]+?\$\$|\$(?:\\.|[^$\\])+\$)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }
    const raw = match[0]
    if (raw.startsWith('$$') && raw.endsWith('$$')) {
      tokens.push({ type: 'display', value: raw.slice(2, -2) })
    } else {
      tokens.push({ type: 'inline', value: raw.slice(1, -1) })
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    tokens.push({ type: 'text', value: text.slice(lastIndex) })
  }

  const renderProse = (prose: string, keyPrefix: string) => {
    // Support simple **bold** and line breaks \n
    const lines = prose.split('\n')
    return lines.map((line, lineIdx) => {
      const boldParts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <React.Fragment key={`${keyPrefix}-l-${lineIdx}`}>
          {lineIdx > 0 && <br />}
          {boldParts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={`${keyPrefix}-b-${lineIdx}-${pIdx}`} className="font-semibold text-slate-100">
                  {part.slice(2, -2)}
                </strong>
              )
            }
            return <React.Fragment key={`${keyPrefix}-t-${lineIdx}-${pIdx}`}>{part}</React.Fragment>
          })}
        </React.Fragment>
      )
    })
  }

  return (
    <span className={className}>
      {tokens.map((tok, idx) => {
        if (tok.type === 'text') {
          return <React.Fragment key={idx}>{renderProse(tok.value, `p${idx}`)}</React.Fragment>
        }
        try {
          const html = katex.renderToString(tok.value, {
            displayMode: tok.type === 'display',
            throwOnError: false,
            strict: false,
          })
          return tok.type === 'display' ? (
            <span
              key={idx}
              className="block my-2 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <span key={idx} dangerouslySetInnerHTML={{ __html: html }} />
          )
        } catch {
          return <span key={idx}>{tok.value}</span>
        }
      })}
    </span>
  )
}
