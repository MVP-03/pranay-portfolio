import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-pixel text-3xl tracking-wide">Contact</h1>
      <p className="mt-2 text-ink/70">
        Or reach me directly:{" "}
        <a href="mailto:pranaysurya4@gmail.com" className="text-accent hover:underline">
          pranaysurya4@gmail.com
        </a>
        ,{" "}
        <a href="https://github.com/MVP-03" className="text-accent hover:underline">
          GitHub
        </a>
        ,{" "}
        <a href="https://linkedin.com/in/venkata-pranay-mula-037a41288" className="text-accent hover:underline">
          LinkedIn
        </a>
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
