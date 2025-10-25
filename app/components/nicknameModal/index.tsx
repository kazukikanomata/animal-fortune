export const NicknameModal = ({
  nickname,
  setNickname,
  onClose,
}: {
  nickname: string;
  setNickname: (nickname: string) => void;
  onClose: () => void;
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="mt-4 text-center">
          <h2 className="text-2xl m-4 text-neutral">ニックネームを入力</h2>
        </div>

        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="ニックネーム"
          className="text-neutral w-full p-3 border border-gray-300 rounded-lg mb-4"
          onKeyPress={(e) => e.key === "Enter" && nickname && onClose()}
        />
        <button
          onClick={onClose}
          disabled={!nickname}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          始める
        </button>
      </div>
    </div>
  );
};
