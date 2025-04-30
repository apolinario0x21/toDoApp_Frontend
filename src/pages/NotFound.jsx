export default function NotFound() {
    return (
        <div className="text-center mt-5">
            <h1 className="display-4">404 - Página Não Encontrada</h1>
            <p className="lead">Desculpe, a página que você está procurando não existe.</p>
            <a href="/api/tasks" className="btn btn-primary">Voltar para a Página Inicial</a>
        </div>
    );
}