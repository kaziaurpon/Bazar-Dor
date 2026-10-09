import StateMessage from "@/components/StateMessage";

export const metadata = { title: "পেজ পাওয়া যায়নি" };

export default function NotFound() {
  return (
    <div className="py-6">
      <StateMessage
        title="দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।"
      />
    </div>
  );
}
