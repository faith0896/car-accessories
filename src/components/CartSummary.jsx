export default function CartSummary({ total }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Cart Summary</h2>
      <p>Total: R{total}</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Checkout</button>
    </div>
  );
}
