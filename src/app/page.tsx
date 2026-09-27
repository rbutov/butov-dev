import Link from 'next/link';

const profileInfo = [
  { key: 'name', value: 'Ruslan Butov', special: 'underline' },
  { key: 'location', value: 'San Francisco Bay Area' },
  { key: 'position', value: 'Senior Software Engineer' },
  { key: 'github', value: 'https://github.com/rbutov', link: true },
  { key: 'linkedin', value: 'https://linkedin.com/in/rbutov', link: true },
];

export default function HomePage() {
  return (
    <code className="block font-mono text-[11px] leading-normal sm:text-[13px]">
      <span className="editor-line">
        <span className="syntax-keyword">export const</span>
        <span className="syntax-property"> profile </span>
        {'= {'}
      </span>
      {profileInfo.map(({ key, value, special, link }) => (
        <span key={key} className="editor-line">
          <span className="block pl-4">
            <span className="syntax-property">{key}</span>:{' '}
            <span className="syntax-string">
              &apos;
              {link ? (
                <Link
                  href={value}
                  className="profile-link rounded-sm underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </Link>
              ) : special === 'underline' ? (
                <>
                  Ruslan{' '}
                  <span className="underline decoration-wavy">Butov</span>
                </>
              ) : (
                value
              )}
              &apos;
            </span>
            ,
          </span>
        </span>
      ))}
      <span className="editor-line">
        <span className="editor-caret">{'}'}</span>
      </span>
    </code>
  );
}
