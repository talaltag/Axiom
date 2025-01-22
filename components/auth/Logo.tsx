
import Image from 'next/image';

export default function Logo() {
  return (
    <div style={{ width: '200px', height: '200px', position: 'relative', margin: '0 auto' }}>
      <Image
        src="/axiom.png"
        alt="Axiom Gaming"
        fill
        sizes="200px"
        priority
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}
